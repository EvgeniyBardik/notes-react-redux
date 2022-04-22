import { useTypedSelector } from "../../hooks/useTypeSelector";
const NotesStaistics = () => {
  const { notes } = useTypedSelector((state) => state.notes);
  const { categories } = useTypedSelector((state) => state.categories);
  const iconName = (categoryId: number) => {
    if (categoryId === 1) {
      return "local_grocery_store";
    }
    if (categoryId === 2) {
      return "lightbulb_outline";
    }
    if (categoryId === 3) {
      return "help_outline";
    } else {
      return "info_outline";
    }
  };

  const countActive = (categoryId: number) => {
    return notes.filter(
      (notes) => notes.active === true && notes.category === categoryId
    ).length;
  };

  const countArchive = (categoryId: number) => {
    return notes.filter(
      (notes) => notes.active === false && notes.category === categoryId
    ).length;
  };
  return (
    <>
      {categories.map((category) => (
        <div
          className="grid grid-cols-12 py-4 items-center bg-yellow-100 text-sm text-gray-700 md:text-base lg:text-lg rounded-lg shadow-md my-4"
          key={category.id}
        >
          <i className="col-span-1 material-icons justify-self-center text-md md:text-2xl lg:text-4xl">
            {iconName(category.id)}
          </i>
          <div className="col-span-5 font-bold">{category.name}</div>
          <div className="col-span-3">{countActive(category.id)}</div>
          <div className="col-span-3">{countArchive(category.id)}</div>
        </div>
      ))}
    </>
  );
};

export default NotesStaistics;
