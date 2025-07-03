import React, { useState, useEffect } from 'react';
import Layout from './common/Layout';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Rating } from 'react-simple-star-rating';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { apiUrl } from '../components/common/http';
import { toast } from 'react-toastify';
import { addToCart } from './utils/cart';

const Product = () => {
  const { id } = useParams();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const baseUrl = apiUrl.replace('/api', '');

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);


  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);



  useEffect(() => {
    fetch(`${apiUrl}/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        // console.log('Fetched product:', data);

        if (data.status === 200 && data.data?.product) {
          setProduct(data.data.product);
          setReviews(data.data.reviews || []);
          setTotalReviews(data.data.total_reviews || 0);
          setAverageRating(data.data.average_rating || 0);
        } else {
          throw new Error('Invalid data shape or status');
        }
      })
      .catch((err) => {
        console.error('Error loading product:', err);
        toast.error('Failed to load product');
      });
  }, [id]);



  if (!product) {
    return (
      <Layout>
        <div className="container py-5 text-center">
          <h5>Loading...</h5>
        </div>
      </Layout>
    );
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiUrl}/products/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: reviewName,
          rating,
          review: reviewText,
        }),
      });
      const result = await res.json();
      if (result.status === 201) {
        toast('Review submitted!');
        setReviewName('');
        setReviewText('');
        setRating(0);
      } else {
        toast('Failed to submit review.');
      }
    } catch (err) {
      console.error(err);
      toast('Something went wrong.');
    }
  };


  const handleAddToCart = () => {
    if (!product) return;

    addToCart(product);
    toast.success('Product added to cart!');
  };






  return (
    <Layout>
      <div className="container px-5">
        <div className="container my-4 px-4 py-4 bg-glossy-blue rounded">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to='/' className="text-white text-decoration-none">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to='/shop' className="text-white text-decoration-none">Shop</Link>
              </li>
              <li className="breadcrumb-item active text-white" aria-current="page">{product.title}</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container product-detail px-5">
        <div className="row">
          <div className="col-md-5">
            <div className="row">
              <div className="col-12">
                <Swiper
                  style={{
                    '--swiper-navigation-color': '#000',
                    '--swiper-pagination-color': '#000',
                  }}
                  loop={true}
                  spaceBetween={0}
                  navigation={true}
                  thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper2"
                >
                  {product.images && product.images.length > 0 ? (
                    product.images.map((img, index) => (
                      <SwiperSlide key={index}>
                        <div className='content'>
                          <img
                            src={`${baseUrl}/uploads/products/large/${img.image}`}
                            alt=""
                            className='w-100'

                          />
                        </div>
                      </SwiperSlide>
                    ))
                  ) : (
                    <SwiperSlide>
                      <img
                        src={`${baseUrl}/uploads/products/large/${product.image}`}
                        className="w-100 img-fluid object-fit-contain"
                        alt={product.title}
                        style={{ maxHeight: '500px' }}
                      />

                    </SwiperSlide>
                  )}
                </Swiper>
              </div>
            </div>
          </div>

          <div className="col-md-7">
            <h2>{product.title}</h2>
            <div className="d-flex align-items-center">
              <Rating readonly initialValue={averageRating} size={20} />
              <span className='pt-1 ps-2'>{totalReviews} Reviews</span>
            </div>


            <div className="pricing mt-2">
              <div className="price text-dark">
                ${product.price}
                {product.compare_price && (
                  <span className="old-price">${product.compare_price}</span>
                )}
              </div>
            </div>

            <div className='mt-2'>
              {product.short_description || 'No description available'}
            </div>

            <button onClick={handleAddToCart} className='btn btn-primary text-uppercase mt-5'>
              Add to Cart
            </button>


            <hr />
            <p>SKU: {product.sku || 'N/A'}</p>
          </div>
        </div>

        <hr />

        <div className="mt-5">
          <h3 className="mb-5">Add Your Review</h3>
          <form onSubmit={handleReviewSubmit}>

            <div className="row g-4">
              {/* Name Field */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label fw-bold">Your Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    required
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                  />
                </div>
              </div>

              {/* Rating Field */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label fw-bold d-block">Your Rating</label>
                  <Rating
                    initialValue={rating}
                    onClick={(rate) => setRating(rate)}
                    size={25}
                  />
                </div>
              </div>

              {/* Review Textarea - Full Width */}
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label fw-bold">Your Review</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Write your review here..."
                    required
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>




            <button type="submit" className="btn btn-primary">Submit Review</button>
          </form>
        </div>

        <Tabs defaultActiveKey="description" id="uncontrolled-tab-example" className="mb-3 mt-5">
          <Tab eventKey="description" title="Description">
            {product.description || 'No additional description provided.'}
          </Tab>
          <Tab eventKey="reviews" title={`Reviews (${totalReviews})`}>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="mb-3 border-bottom pb-2">
                  <div className="fw-bold">{review.name}</div>
                  <Rating readonly initialValue={review.rating} size={18} />
                  <p className="mb-1 mt-1">{review.review}</p>
                  <small className="text-muted">{new Date(review.created_at).toLocaleDateString()}</small>
                </div>
              ))
            ) : (
              <p className="text-muted">No reviews yet.</p>
            )}
          </Tab>

        </Tabs>
      </div>
    </Layout>
  );
};

export default Product;
