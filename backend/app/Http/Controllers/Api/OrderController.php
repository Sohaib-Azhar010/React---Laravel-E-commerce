<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderConfirmation;
use Illuminate\Support\Facades\Log;
use Stripe\PaymentIntent;
use Stripe\Stripe;
use Stripe\Checkout\Session;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $frontendUrl = config('app.frontend_url');
        Log::info('Order Payload:', request()->all());
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'address' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|string',
            'zip' => 'required|string',
            'mobile' => 'required|string',
            'payment_method' => 'required|string',
            'items' => 'required|array',
            'subtotal' => 'required|numeric',
            'shipping' => 'required|numeric',
            'total' => 'required|numeric',
        ]);

        // 1. Save Order first (Stripe or COD)
        $order = Order::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'address' => $validated['address'],
            'city' => $validated['city'],
            'state' => $validated['state'],
            'zip' => $validated['zip'],
            'mobile' => $validated['mobile'],
            'payment_method' => $validated['payment_method'],
            'payment_status' => $validated['payment_method'] === 'stripe' ? 'paid' : 'pending',
            'total' => $validated['total'],
        ]);

        // 2. Save Order Items
        foreach ($validated['items'] as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['id'],
                'title' => $item['title'],
                'price' => $item['price'],
                'quantity' => $item['quantity'],
                'image' => $item['image'],
            ]);
        }

        if ($request->payment_method === 'stripe') {
            Stripe::setApiKey(env('STRIPE_SECRET'));

            $lineItems = collect($request->items)->map(function ($item) {
                return [
                    'price_data' => [
                        'currency' => 'usd',
                        'unit_amount' => $item['price'] * 100,
                        'product_data' => ['name' => $item['title']],
                    ],
                    'quantity' => $item['quantity'],
                ];
            })->toArray();

            $session = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => $lineItems,
                'mode' => 'payment',
                'success_url' => $frontendUrl . '/payment-success',
                'cancel_url' => $frontendUrl . '/payment-cancel',
            ]);

            return response()->json(['sessionId' => $session->id]);
        }


        // 4. Send confirmation email (for COD or after Stripe confirmation callback)
        Mail::to($order->email)->send(new OrderConfirmation($order));

        return response()->json([
            'success' => true,
            'payment_method' => $order->payment_method,
            'message' => 'Order placed successfully.',
            'order_id' => $order->id
        ]);
    }
}
