import { Trans, useLocale } from "@recap/i18n";

const CategoryTitle = ({
  categoryName,
  time,
}: {
  categoryName: string;
  time: string;
}) => {
  const { t } = useLocale("analysis");

  return (
    <>
      <h2 className="text-subtitle-2-rg whitespace-nowrap text-gray-800">
        {t("category.title")}
      </h2>
      <h3 className="text-headline-sb mt-1 whitespace-nowrap text-gray-900">
        <Trans
          ns="analysis"
          i18nKey="category.shoppingFocusSummary"
          values={{ category: categoryName, time_spent: time }}
          components={{
            category: <span className="text-blue-400" />,
            time: <span className="text-blue-400" />,
          }}
        />
      </h3>
    </>
  );
};
export default CategoryTitle;
