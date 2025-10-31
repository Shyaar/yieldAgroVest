
import { FC, ReactNode } from "react";
import { Button } from "./Button";

interface ListingCardProps {
  title: string;
  description: string;
  imageUrl: string;
  actionText: string;
  onAction: () => void;
  children?: ReactNode;
}

const ListingCard: FC<ListingCardProps> = ({
  title,
  description,
  imageUrl,
  actionText,
  onAction,
  children,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        {children}
        <Button onClick={onAction} className="mt-4">
          {actionText}
        </Button>
      </div>
    </div>
  );
};

export default ListingCard;
