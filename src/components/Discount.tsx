import '../assets/scss/components/_discount.scss';

interface DiscountProps {
  title: number | null;
}

const Discount = ({ title }: DiscountProps) => {
  return <div className="discount">{title}%</div>;
};

export default Discount;

// услуга, геймItem набор продуктов
