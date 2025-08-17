import Product from "./products/page"
const Home = () => {

    return (
        <div className="Home w-full">
            <section className="px-4 py-8">
                <div className="section-heading mb-6">
                    <h2 className="text-2xl font-bold">All Products</h2>
                </div>

                    <Product />
            </section>
        </div>
    )
}
export default Home;