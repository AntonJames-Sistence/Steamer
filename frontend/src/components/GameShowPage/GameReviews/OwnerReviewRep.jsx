import { useDispatch } from "react-redux";
import { deleteReview } from "../../../store/reviews";


const OwnerReviewRep = ({review}) => {
    const { id, body } = review;
    const dispatch = useDispatch();

    return (
        <div>
            <div>{body}</div>
        </div>
    )
}

export default OwnerReviewRep;