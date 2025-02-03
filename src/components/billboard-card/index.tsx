import { useState } from 'react';
import './index.css';

type Props = {
  image: string,
  text: string,
  advertiser: string
}

export default function BillboardCard({ image, text, advertiser }: Props) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  return (
    <div className="card">
      <div className="image-box">
        <img 
          src={image} 
          alt="image" 
          onLoad={() => setIsImageLoading(false)}
          style={{ display: isImageLoading ? 'none' : 'block' }}
        />
        {isImageLoading && <div>Loading image...</div>}
      </div>
      <h1>{advertiser}</h1>
      <p>{text}</p>
    </div>
  )
}