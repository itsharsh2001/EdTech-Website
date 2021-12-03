import User from '../models/user.js'
import FbUsers from '../models/facebookUsers.js'
import GoogleUsers from '../models/googleUsers.js'
import PaidClients from '../models/paidClients.js'
import Razorpay from 'razorpay'
import bodyParser from 'body-parser'
import crypto from 'crypto'

export const createPayment = async (req, res) => {

    try {

        const { payingPrice, planName, planType } = req.body;

        const email = req.user.email;

        const userData = await User.findOne({ email: email });

        if (!userData) {

            const facebookUser = await FbUsers.findOne({ email: email })

            if (facebookUser) {

                const checkPrice = await PaidClients.findOne({ email: email, isPaid: true, planName: planName, planType: planType })

                if (checkPrice) {
                    return res.status(200).json({ message: 'You have already purchased this course' })
                }

                const triedClient = await PaidClients.findOne({ email: email, isPaid: false, planName: planName })

                if (!triedClient) {


                    const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_API_KEY, key_secret: process.env.RAZORPAY_API_KEY_SECRET })

                    const options = {
                        amount: payingPrice * 100,
                        payment_capture: 1,
                        currency: 'INR',
                        receipt: `Course - ${planName} - ${payingPrice}Rs`
                    }


                    const response = await razorpay.orders.create(options)

                    var currentdate = new Date();
                    var date = currentdate.getDay() + "/" + currentdate.getMonth()
                        + "/" + currentdate.getFullYear() + " @ "
                        + currentdate.getHours() + ":"
                        + currentdate.getMinutes() + ":" + currentdate.getSeconds();

                    const makeClientPayment = new PaidClients({
                        name: facebookUser.name,
                        email: facebookUser.email,
                        phone: '',
                        planType: planType,
                        planName: planName,
                        payingPrice: payingPrice,
                        orderId: response.id,
                        date: date
                    })


                    await makeClientPayment.save()

                    return res.status(200).json({
                        orderid: response.id,
                        orderreceipt: response.receipt,
                        ordercurrency: response.currency,
                        orderamount: response.amount,
                        orderemail: facebookUser.email,
                        orderphone: '',
                        ordername: facebookUser.name,
                    })

                }else{


                    const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_API_KEY, key_secret: process.env.RAZORPAY_API_KEY_SECRET })

            const options = {
                amount: payingPrice * 100,
                payment_capture: 1,
                currency: 'INR',
                receipt: `Course - ${planName} - ${payingPrice}Rs`
            }


            const response = await razorpay.orders.create(options)

            var currentdate = new Date();
            var date = currentdate.getDay() + "/" + currentdate.getMonth()
                + "/" + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":" + currentdate.getSeconds();

            triedClient.orderId = response.id
            triedClient.date = date
            await triedClient.save()

            return res.status(200).json({
                orderid: response.id,
                orderreceipt: response.receipt,
                ordercurrency: response.currency,
                orderamount: response.amount,
                orderemail: facebookUser.email,
                orderphone: '',
                ordername: facebookUser.name,
            })


                }

            }else{

                const googleUser = await GoogleUsers.findOne({ email: email })

            if (googleUser) {

                const checkPrice = await PaidClients.findOne({ email: email, isPaid: true, planName: planName, planType: planType })

                if (checkPrice) {
                    return res.status(200).json({ message: 'You have already purchased this course' })
                }

                const triedClient = await PaidClients.findOne({ email: email, isPaid: false, planName: planName })

                if (!triedClient) {


                    const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_API_KEY, key_secret: process.env.RAZORPAY_API_KEY_SECRET })

                    const options = {
                        amount: payingPrice * 100,
                        payment_capture: 1,
                        currency: 'INR',
                        receipt: `Course - ${planName} - ${payingPrice}Rs`
                    }


                    const response = await razorpay.orders.create(options)

                    var currentdate = new Date();
                    var date = currentdate.getDay() + "/" + currentdate.getMonth()
                        + "/" + currentdate.getFullYear() + " @ "
                        + currentdate.getHours() + ":"
                        + currentdate.getMinutes() + ":" + currentdate.getSeconds();

                    const makeClientPayment = new PaidClients({
                        name: googleUser.name,
                        email: googleUser.email,
                        phone: '',
                        planType: planType,
                        planName: planName,
                        payingPrice: payingPrice,
                        orderId: response.id,
                        date: date
                    })


                    await makeClientPayment.save()

                    return res.status(200).json({
                        orderid: response.id,
                        orderreceipt: response.receipt,
                        ordercurrency: response.currency,
                        orderamount: response.amount,
                        orderemail: googleUser.email,
                        orderphone: '',
                        ordername: googleUser.name,
                    })

                }else{

                    const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_API_KEY, key_secret: process.env.RAZORPAY_API_KEY_SECRET })

            const options = {
                amount: payingPrice * 100,
                payment_capture: 1,
                currency: 'INR',
                receipt: `Course - ${planName} - ${payingPrice}Rs`
            }


            const response = await razorpay.orders.create(options)

            var currentdate = new Date();
            var date = currentdate.getDay() + "/" + currentdate.getMonth()
                + "/" + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":" + currentdate.getSeconds();

            triedClient.orderId = response.id
            triedClient.date = date
            await triedClient.save()

            return res.status(200).json({
                orderid: response.id,
                orderreceipt: response.receipt,
                ordercurrency: response.currency,
                orderamount: response.amount,
                orderemail: googleUser.email,
                orderphone: '',
                ordername: googleUser.name,
            })

                }




            }

            }


        }


        if (!userData.isverified) {
            return res.status(400).json({ message: 'You are not verified. Please verify it' })
        }

        const checkPrice = await PaidClients.findOne({ email: email, isPaid: true, planName: planName, planType: planType })

        if (checkPrice) {
            return res.status(200).json({ message: 'You have already purchased this course' })
        }

        const triedClient = await PaidClients.findOne({ email: email, isPaid: false, planName: planName })

        if (!triedClient) {


            const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_API_KEY, key_secret: process.env.RAZORPAY_API_KEY_SECRET })

            const options = {
                amount: payingPrice * 100,
                payment_capture: 1,
                currency: 'INR',
                receipt: `Course - ${planName} - ${payingPrice}Rs`
            }


            const response = await razorpay.orders.create(options)

            var currentdate = new Date();
            var date = currentdate.getDay() + "/" + currentdate.getMonth()
                + "/" + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":" + currentdate.getSeconds();

            const makeClientPayment = new PaidClients({
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                planType: planType,
                planName: planName,
                payingPrice: payingPrice,
                orderId: response.id,
                date: date
            })


            await makeClientPayment.save()

            return res.status(200).json({
                orderid: response.id,
                orderreceipt: response.receipt,
                ordercurrency: response.currency,
                orderamount: response.amount,
                orderemail: userData.email,
                orderphone: userData.phone,
                ordername: userData.name,
            })

        }

        else {

            const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_API_KEY, key_secret: process.env.RAZORPAY_API_KEY_SECRET })

            const options = {
                amount: payingPrice * 100,
                payment_capture: 1,
                currency: 'INR',
                receipt: `Course - ${planName} - ${payingPrice}Rs`
            }


            const response = await razorpay.orders.create(options)

            var currentdate = new Date();
            var date = currentdate.getDay() + "/" + currentdate.getMonth()
                + "/" + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":" + currentdate.getSeconds();

            triedClient.orderId = response.id
            triedClient.date = date
            await triedClient.save()

            return res.status(200).json({
                orderid: response.id,
                orderreceipt: response.receipt,
                ordercurrency: response.currency,
                orderamount: response.amount,
                orderemail: userData.email,
                orderphone: userData.phone,
                ordername: userData.name,
            })

        }


    } catch (error) {
        console.log(error)
    }

}



export const verifyPayment = async (req, res) => {

    bodyParser.json(req.body)
    try {
        const secret = process.env.razorpay_secret_webhook;
        const data = req.body

        const shasum = crypto.createHmac('sha256', secret);
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest('hex');

        if (digest == req.headers['x-razorpay-signature']) {

            const isVerified = await PaidClients.findOne({ orderId: data.payload.payment.entity.order_id });

            isVerified.isPaid = true;
            isVerified.modeOfPayment = data.payload.payment.entity.method;

            await isVerified.save();

        } else {
            res.status(422).json("error")
        }

        res.json({ status: 'ok' });

    } catch (error) {
        res.status(422).json({ message: "error is occuring" })
    }

}
