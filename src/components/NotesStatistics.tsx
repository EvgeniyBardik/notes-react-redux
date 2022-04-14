import { useTypedSelector } from "../hooks/useTypeSelector";
const NotesStaistics = () => {
    const { notes } = useTypedSelector((state) => state.notes);
    const { categories } = useTypedSelector((state) => state.categories);    
    const iconName = (categoryId:number) => {
        if (categoryId === 1) {
            return 'local_grocery_store'
        }
        if (categoryId === 2) {
            return 'lightbulb_outline'
        }
        if (categoryId === 3) {
            return 'help_outline'
        } else {
            return 'info_outline'
        }
    }

    
    const countActive = (categoryId:number) => {
        return notes.filter(notes => notes.active === true && notes.category === categoryId).length
    }
    
    const countArchive = (categoryId:number) => {
        return notes.filter(notes => notes.active === false && notes.category === categoryId).length
    }
    return ( 
        <>
        {categories.map((category) => (
        <div className="item2" key={category.id}>
            <div className="item2__ico"><i className="material-icons">{iconName(category.id)}</i></div>
            <div className="item2__category">{category.name}</div>
            <div className="item2__active">{countActive(category.id)}</div>
            <div className="item2__archived">{countArchive(category.id)}</div>
        </div>
        ))}
        </>
    )
    
}


export default NotesStaistics