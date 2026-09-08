import { useEffect, useRef, useState } from 'react'
import Hero from '../components/ui/Hero'
import CategorySection from '../components/ui/CategorySection'
import Brands from '../components/ui/Brands'
import Button from '../components/ui/Button'
import ProductCard from '../components/layout/ProductCard'
import { getAllProducts, getProductImageUrl } from '../api/product.service'
import ReviewCard from '../components/ui/ReviewCard'

const testimonials = [
  { name: 'Sarah M.', rating: 5, text: 'The quality is even better than I expected. My new jacket fits perfectly, feels substantial, and arrived beautifully packaged.' },
  { name: 'Alex K.', rating: 5, text: 'I finally found basics that feel considered instead of boring. The heavyweight tee has become the first thing I reach for every morning.' },
  { name: 'James L.', rating: 5, text: 'The sizing guide was spot on and delivery was quick. I wore my new overshirt the day it arrived and got three compliments.' },
  { name: 'Priya S.', rating: 4.5, text: 'Shop.co makes putting outfits together feel easy. The fabric is soft, the colors are exactly as pictured, and everything washes well.' },
  { name: 'Mia R.', rating: 5, text: 'I ordered for a weekend trip and the pieces worked for every plan. Stylish, comfortable, and no last-minute tailoring needed.' },
  { name: 'Daniel W.', rating: 5, text: 'This is my third order and the consistency is impressive. The fit, stitching, and customer service have all been excellent.' },
  { name: 'Olivia T.', rating: 5, text: 'The wide range of styles helped me refresh my wardrobe without losing my personal look. I am already planning my next order.' },
]

const HomePage = () => {
  const [newArrivals, setNewArrivals] = useState([])
  const [topSelling, setTopSelling] = useState([])
  const testimonialsRef = useRef(null)

  const navigate = (path) => {
    window.location.href = path
  }

  const scrollTestimonials = (direction) => {
    const carousel = testimonialsRef.current
    const firstCard = carousel?.firstElementChild
    if (!firstCard) return

    carousel.scrollBy({
      left: direction * (firstCard.getBoundingClientRect().width + 16),
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const [newestResponse, allProductsResponse] = await Promise.all([
          getAllProducts({ sort: 'newest', limit: 4 }),
          getAllProducts({ limit: 100 }),
        ])

        setNewArrivals(newestResponse.products?.slice(0, 4) || [])
        const products = allProductsResponse.products || []
        setTopSelling([...products].sort(() => Math.random() - 0.5).slice(0, 4))
      } catch (error) {
        console.error('Unable to load homepage products:', error)
      }
    }

    loadProducts()
  }, [])

  const renderProduct = (product, section) => (
    <ProductCard
      key={product._id}
      product={product}
      section={section}
      imageSrc={getProductImageUrl(product.images?.[0])}
    />
  )

  return (
    <div>
      <Hero />
      <Brands />

      <section className="new-arrivals" id="new-arrivals">
      <div className="new-arrivals__heading">New Arrivals</div>
      <div className="new-arrivals__container">
        {newArrivals.map((product) => renderProduct(product, 'new-arrivals'))}
      </div>
      <Button className="new-arrivals__button" text="View All" onClick={() => navigate('/category')} />
    </section>

    <section className="top-selling" id="top-selling">
      <div className="top-selling__heading">Top Selling</div>
      <div className="top-selling__container">
        {topSelling.map((product) => renderProduct(product, 'top-selling'))}
      </div>
      <Button className="top-selling__button" text="View All" onClick={() => navigate('/category')} />
    </section>

    <CategorySection />

    <section className="testemonials">
      <div className="testemonials__header">
        <h2 className="testemonials__heading">Our Happy Customers</h2>
        <div className="testemonials__controls" aria-label="Testimonial navigation">
          <button className="testemonials__control" type="button" aria-label="Previous testimonials" onClick={() => scrollTestimonials(-1)}>&larr;</button>
          <button className="testemonials__control" type="button" aria-label="Next testimonials" onClick={() => scrollTestimonials(1)}>&rarr;</button>
        </div>
      </div>
      <div className="testemonials__review-card" ref={testimonialsRef} aria-label="Customer testimonials">
        {testimonials.map((review) => <ReviewCard key={review.name} review={review} variant="testimonial" />)}
      </div>
    </section>
    </div>
  )
}

export default HomePage