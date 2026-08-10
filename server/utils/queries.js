const Mongoose = require('mongoose');
exports.getStoreProductsQuery = (min, max, rating) => {
  min = Number(min);
  max = Number(max);
  rating = Number(rating);

  const matchQuery = {
    isActive: true
  };

  // Add price filter only when both values exist
  if (!Number.isNaN(min) && !Number.isNaN(max) && min > 0 && max > 0) {
    matchQuery.price = {
      $gte: min,
      $lte: max
    };
  }

  const basicQuery = [
    {
      $lookup: {
        from: 'brands',
        localField: 'brand',
        foreignField: '_id',
        as: 'brands'
      }
    },
    {
      $unwind: {
        path: '$brands',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $addFields: {
        'brand.name': '$brands.name',
        'brand._id': '$brands._id',
        'brand.isActive': '$brands.isActive'
      }
    },
    {
      $match: {
        'brand.isActive': true
      }
    },
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'product',
        as: 'reviews'
      }
    },
    {
      $addFields: {
        totalRatings: { $sum: '$reviews.rating' },
        totalReviews: { $size: '$reviews' }
      }
    },
    {
      $addFields: {
        averageRating: {
          $cond: [
            { $eq: ['$totalReviews', 0] },
            0,
            { $divide: ['$totalRatings', '$totalReviews'] }
          ]
        }
      }
    }
  ];

  // Add rating filter only when user actually selected a rating
  if (!Number.isNaN(rating) && rating > 0) {
    basicQuery.push({
      $match: {
        averageRating: { $gte: rating }
      }
    });
  }

  basicQuery.push({
    $project: {
      brands: 0,
      reviews: 0
    }
  });

  return basicQuery;
};

exports.getStoreProductsWishListQuery = userId => {
  const wishListQuery = [
    {
      $lookup: {
        from: 'wishlists',
        let: { product: '$_id' },
        pipeline: [
          {
            $match: {
              $and: [
                { $expr: { $eq: ['$$product', '$product'] } },
                { user: new Mongoose.Types.ObjectId(userId) }
              ]
            }
          }
        ],
        as: 'isLiked'
      }
    },
    {
      $addFields: {
        isLiked: { $arrayElemAt: ['$isLiked.isLiked', 0] }
      }
    }
  ];

  return wishListQuery;
};
