<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\Category;
use App\Models\Brand;
use App\Models\Newsletter;
use App\Models\Contact;
use App\Models\Shipped;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function metrics()
    {
        $totalOrders = Order::count();
        $totalProducts = Product::count();
        $totalCategories = Category::count();
        $totalBrands = Brand::count();
        $totalSubscribers = Newsletter::count();
        $totalMessages = Contact::count();
        $totalShipped = Shipped::distinct('order_id')->count('order_id');
        $totalSales = Order::where('payment_status', 'paid')->sum('total');

        return response()->json([
            'orders' => $totalOrders,
            'products' => $totalProducts,
            'categories' => $totalCategories,
            'brands' => $totalBrands,
            'subscribers' => $totalSubscribers,
            'messages' => $totalMessages,
            'shipped' => $totalShipped,
            'sales' => $totalSales,
        ]);
    }

    public function salesData()
    {
        $monthly = Order::selectRaw('MONTH(created_at) as month, SUM(total) as total')
            ->groupByRaw('MONTH(created_at)')
            ->get()
            ->map(function ($item) {
                return ['month' => date('F', mktime(0, 0, 0, $item->month, 1)), 'total' => $item->total];
            });

        $weekly = Order::selectRaw('WEEK(created_at) as week, SUM(total) as total')
            ->groupByRaw('WEEK(created_at)')
            ->get()
            ->map(fn($item) => ['week' => 'Week ' . $item->week, 'total' => $item->total]);

        

        return response()->json([
            'monthly' => $monthly,
            'weekly' => $weekly,
        ]);
    }
}
