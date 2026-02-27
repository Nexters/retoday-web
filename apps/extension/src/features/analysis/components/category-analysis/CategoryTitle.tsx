const CategoryTitle = ({
  categoryName,
  time,
}: {
  categoryName: string;
  time: string;
}) => {
  return (
    <>
      <h2 className="text-subtitle-2-rg whitespace-nowrap text-gray-800">
        카테고리별 분석
      </h2>
      <h3 className="text-headline-sb mt-1 whitespace-nowrap text-gray-900">
        <span className="text-blue-400">{categoryName}</span>에{" "}
        <span className="text-blue-400">{time}</span> 몰두했어요
      </h3>
    </>
  );
};
export default CategoryTitle;
