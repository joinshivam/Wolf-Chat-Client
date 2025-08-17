const ProductView = ({ params, searchParams }) => {
  const { brand} = params;
  return (
    <div className="p-8 grid gap-8">
      <div> Brand : {brand}</div>
    </div>
  )
}

export default ProductView;