import './NotesStatistics.css'
import { ShowArchived, ShowActive } from '../../redux/actions';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { useDispatch } from 'react-redux';
const NotesStatisticsHeader: React.FC = () => {
    const dispatch = useDispatch()
    const active = useTypedSelector((state) => state.app.active);
        return (
            <div className="header2">
                <div />
                <div>Note Category</div>
                <div className={["header2__switch-active", active?"active":null].join(' ')} onClick={() => dispatch(ShowActive())}>Active</div>
                <div className={["header2__switch-archived", !active?"active":null].join(' ')} onClick={() => dispatch(ShowArchived())}>Archived</div>
            </div>
        )
}
export default NotesStatisticsHeader;