const mysql =require("mysql");
const productSchema = new mysql.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  // Add other fields as necessary
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;