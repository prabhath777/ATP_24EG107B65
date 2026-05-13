function Product(props) {
  console.log(props)
  const {productObj} = props
    
return (
    <div className="w-full max-w-sm border rounded-xl p-4 bg-slate-900 text-white">

      {/* Category */}
      <span className="text-xs text-blue-400">
        {productObj.category}
      </span>

      {/* Title */}
      <h2 className="text-lg font-semibold mt-1">
        {productObj.title}
      </h2>

      {/* Description */}
      <p className="text-sm text-slate-400 mt-2">
        {productObj.description}
      </p>

      {/* Bottom */}
      <div className="flex justify-between items-center mt-4">
        <span className="font-bold">
          ₹{productObj.price}
        </span>

        <button className="px-3 py-1 bg-blue-600 rounded-md">
          Buy
        </button>
      </div>

    </div>
  );
}


export default Product;