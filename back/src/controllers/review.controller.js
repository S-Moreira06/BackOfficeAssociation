import reviewService from '../services/review.service.js'

async function addReview(c) {
    try {
        const data = c.req.valid('json');
        await reviewService.addReview(data);
        return c.json({
            message: 'Add review successfull'
        }, 201)
    } catch(error) {
        console.error(error);
        return c.json({
            error: 'Add review failed'
        }, 400)
    }
}

export { addReview }