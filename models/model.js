const mongoose = require('mongoose');
const { Schema } = mongoose;

// Report Content Schema
const ReportContentSchema = new Schema({
  contentId: { type: String, required: true },
  reasonForReport: { type: String, required: true },
  notes: { type: String, required: true },
 
},{timestamps: true});

// Report Schema
const ReportSchema = new Schema({
  merchant_id: { type: String, required: true },
  customer_id: { type: String, required: true },
  customer_email: { type: String, required: true },
  issues_Type: { type: String, required: true },
  report_content: { type: ReportContentSchema, required: true }
},{timestamps: true});

// Bad Customer Schema
const BadCustomerSchema = new Schema({
  customerEmail: { type: String, required: true },
  customerName: { type: String, required: true },
  custerAddress: { type: String, required: true },
  reports_id: { type: Schema.Types.ObjectId, ref: 'Report', required: true }
},{timestamps:true});

// Main Shop Schema
const ShopSchema = new Schema({
  shopName: { type: String, required: true },
  shopUrls: { type: String, required: true },
  reports: [ReportSchema],
  badCustomers: [BadCustomerSchema]
}, {timestamps:true});

// Create the model
const Shop = mongoose.model('Shop', ShopSchema);

module.exports = Shop;
