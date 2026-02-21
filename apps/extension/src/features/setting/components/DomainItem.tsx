import { Button } from "@recap/ui";

const DomainItem = ({ domain }: { domain: string }) => {
  return (
    <div className="flex items-center justify-between bg-gray-75 rounded-full pr-2 pl-4 py-2">
      <p className="text-body-3 text-gray-500">{domain}</p>
      <Button
        variant="subtle"
        size={"sm"}
        className="w-auto text-red-500 px-2.5"
      >
        삭제
      </Button>
    </div>
  );
};

export default DomainItem;
