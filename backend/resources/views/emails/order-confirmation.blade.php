<h2>Order Confirmation</h2>
<p>Thank you {{ $order->name }} for your order!</p>
<p>Order ID: <strong>#{{ $order->id }}</strong></p>

<h4>Order Summary:</h4>
<ul>
    @foreach ($order->items as $item)
        <li>{{ $item->title }} x {{ $item->quantity }} - ${{ $item->price }}</li>
    @endforeach
</ul>

<p>Total: ${{ $order->total }}</p>
