import { ShowArchived, ShowActive } from '../redux/actions';
import { useTypedSelector } from '../hooks/useTypeSelector';
import { useDispatch } from 'react-redux';
const NotesStatisticsHeader: React.FC = () => {
    const dispatch = useDispatch()
    const active = useTypedSelector((state) => state.app.active);
    if (active) {
        return (
            <div className="header2">
                <div />
                <div>Note Category</div>
                <div className="header2__switch-active active" onClick={() => dispatch(ShowActive())}>Active</div>
                <div className="header2__switch-archived" onClick={() => dispatch(ShowArchived())}>Archived</div>
            </div>
        )
    } else {
        return (
            <div className="header2">
                <div />
                <div>Note Category</div>
                <div className="header2__switch-active" onClick={() => dispatch(ShowActive())}>Active</div>
                <div className="header2__switch-archived active" onClick={() => dispatch(ShowArchived())}>Archived</div>
            </div>
         ) }
        
}
export default NotesStatisticsHeader;