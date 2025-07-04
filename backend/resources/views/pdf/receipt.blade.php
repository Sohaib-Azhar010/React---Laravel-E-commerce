<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Order Receipt</title>
    <style>
        body { font-family: sans-serif; font-size: 14px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #000; padding: 8px; text-align: left; }
        h2 { margin-bottom: 0; }
    </style>
</head>
<body>
    <h2>Order Receipt - #{{ $order->id }}</h2>
    <p><strong>Name:</strong> {{ $order->name }}</p>
    <p><strong>Email:</strong> {{ $order->email }}</p>
    <p><strong>Address:</strong> {{ $order->address }}, {{ $order->city }}, {{ $order->state }}, {{ $order->zip }}</p>
    <p><strong>Mobile:</strong> {{ $order->mobile }}</p>
    <p><strong>Payment Method:</strong> {{ ucfirst($order->payment_method) }}</p>
    <p><strong>Status:</strong> {{ ucfirst($order->payment_status) }}</p>
    <p><strong>Total:</strong> ${{ $order->total }}</p>

    <h3>Order Items</h3>
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
            </tr>
        </thead>
        <tbody>
        @foreach ($order->items as $item)
            <tr>
                <td>{{ $item->title }}</td>
                <td>{{ $item->quantity }}</td>
                <td>${{ number_format($item->price, 2) }}</td>
                <td>${{ number_format($item->price * $item->quantity, 2) }}</td>
            </tr>
        @endforeach
        </tbody>
    </table>
</body>
</html>
