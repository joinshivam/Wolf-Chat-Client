const ProductView = ({ params, searchParams }) => {
  const { brand, category} = params;
  return (
    <div className="p-8 grid gap-8">
      <div> Brand : {brand}</div>
      <div>Category : {category}</div>
    </div>
  )
}

export default ProductView;