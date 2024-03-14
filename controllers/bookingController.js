// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const Tour = require('./../models/tourModel');
// const catchAsync = require('./../utils/catchAsync');
// const AppError = require('./../utils/appError')
// const factory = require('./handlerFactory');

// exports.getCheckoutSession=catchAsync(async(req, res, next)=>{
//     // 1- Get the currently current bookes tour
//     const tour = await Tour.findById(req.params.tourID);
//     // 2- Create Checkout session
//     const session= await stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         success_url: `${req.protocol}://${req.get('host')}/`,
//         cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
//         customer_email: req.user.email,
//         client_reference_id: req.params.tourID,
//         line_items:[{
//             name: `${tour.name} Tour`,
//             description: tour.summary,
//             images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
//             amount: tour.price * 100,
//             currency: 'usd',
//             quantity: 1
//         }]
//     })
//     // 3- Create session as response
//     res.status(200).json({
//         status: 'success',
//         session
//     })
// })

// Updated Code!
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const AppError = require('../utils/appError');
const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
    // 1) Get the currently booking tour
    const tour = await Tour.findById(req.params.tourId);

    // 2) Create checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${req.protocol}://${req.get('host')}/my-tours/?tour=${
            req.params.tourId
        }&user=${req.user.id}&price=${tour.price}`,

        cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
        mode: 'payment',
        customer_email: req.user.email,
        client_reference_id: req.params.tourId,

        line_items: [
            {
                price_data: {
                    currency: 'USD',
                    product_data: {
                        name: `${tour.name} Tour`,
                    },
                    unit_amount: tour.price * 100,
                },
                quantity: 1,
            },
        ],
    });
    // 3) Create checkout response
    res.status(200).json({
        status: 'success',
        session,
    });
});