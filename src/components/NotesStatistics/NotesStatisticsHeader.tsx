import { ShowArchived, ShowActive } from "../../redux/actions";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { useDispatch } from "react-redux";
const NotesStatisticsHeader: React.FC = () => {
  const dispatch = useDispatch();
  const active = useTypedSelector((state) => state.app.active);
  return (
    <div className="grid grid-cols-12 py-1 items-center bg-emerald-200 text-sm text-gray-500 md:text-base lg:text-lg rounded-lg shadow-md my-4">
      <div className="col-start-2 col-span-5 font-semibold">Note Category</div>
      <div
        className={[
          "col-span-3 hover:cursor-pointer hover:font-bold transition-all duration-500",
          active ? "underline" : null,
        ].join(" ")}
        onClick={() => dispatch(ShowActive())}
      >
        Active
      </div>
      <div
        className={[
          "col-span-3 hover:cursor-pointer hover:font-bold transition-all duration-500",
          !active ? "underline" : null,
        ].join(" ")}
        onClick={() => dispatch(ShowArchived())}
      >
        Archived
      </div>
    </div>
  );
};
export default NotesStatisticsHeader;
