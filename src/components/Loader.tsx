import { ThreeDots } from "react-loader-spinner";

interface LoaderProps {
  mt?: string;
}

const Loader = ({ mt }: LoaderProps) => {
  return (
    <div className="loaderBoxStyle">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#384661"
        //   wrapperClassName="loaderStyle"
        ariaLabel="three-dots-loading"
        wrapperStyle={{
          marginTop: mt ? mt : "50px",
          marginBottom: mt ? "27px" : "0",
        }}
        visible={true}
      />
    </div>
  );
};
export default Loader;
