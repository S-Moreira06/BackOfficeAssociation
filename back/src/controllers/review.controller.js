import reviewService from '../services/review.service.js'
import availabilityService from "../services/availability.service.js";

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


async function deleteReview(c) {
    try {
        const reviewId = c.req.param('id');
        await reviewService.softDeleteReview(reviewId);
        return c.json({
            message: "Delete review successfull"
        }, 201);
    } catch (error) {
        console.error(error);
        return c.json({ error: 'Delete review failed'}, 400);
    }
}

async function editReview(c) {
    try {
        const reviewId = c.req.param('id');
        const data = c.req.valid('json');
        await reviewService.updateReview(reviewId, data);
        return c.json({
            message: 'Update review successfull'
        }, 201)
    } catch (error) {
        console.error(error);
        return c.json({error: 'update review failed'}, 400)
    }
}


export { addReview, editReview, deleteReview }