import { useProductHighlightReview } from '@/hooks/useProductHighlightReview';
import { useParams } from 'react-router';

export const ProductReview = () => {
  const { productId } = useParams();

  const { data: productReview } = useProductHighlightReview(productId || '');

  return (
    <div>
      {productReview?.reviews.map((review) => (
        <div
          key={review.id}
          style={{ marginBottom: '15px', padding: '10px', border: '1px solid #eee' }}
        >
          <div style={{ fontWeight: 'bold' }}>{review.authorName}</div>
          <div>{review.content}</div>
        </div>
      ))}
    </div>
  );
};
