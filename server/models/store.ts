import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
  id: Number,
  name: String,
  coords: {
    lat: Number,
    lng: Number,
  },
});

const Store = mongoose.model('Store', storeSchema);

export default Store