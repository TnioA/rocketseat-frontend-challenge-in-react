import { useSearchParams } from "react-router-dom";
import { getPageCount } from "../utils/getPageCount";
import { ReactComponent as ArrowIcon } from '../assets/arrow.svg';

interface Props {
    pageParam: string | null;
    totalCount: number;
}

export function Pagination(props: Props) {
    const PRODUCT_LIMIT_FOR_PAGE = 8;

    const [searchParams, setSearchParams] = useSearchParams();

    function paginate(value: string) {
        if(Number(value) < 1 || Number(value) > getPageCount(props.totalCount, PRODUCT_LIMIT_FOR_PAGE)) 
            return;

        searchParams.set("page", value);
        setSearchParams(searchParams);
    }

    function renderPagination() {
        var pages = getPageCount(props.totalCount, PRODUCT_LIMIT_FOR_PAGE);

        return Array.from(Array(pages).keys()).map((page: number) => (
            <li key={page}>
                <button className={`pagination-item ${(page + 1) === Number(props.pageParam ?? "1") ? "active" : ""}`} type="button" onClick={() => paginate(`${page + 1}`)}>{page + 1}</button>
            </li>
        ));
    }

    return <ul className="pagination">
        {renderPagination()}
        <li>
            <button className="pagination-item previous" type="button" onClick={() => paginate((Number(props.pageParam ?? "1") - 1).toString())}>
                <ArrowIcon className="left" />
            </button>
        </li>
        <li>
            <button className="pagination-item next" type="button" onClick={() => paginate((Number(props.pageParam ?? "1") + 1).toString())}>
                <ArrowIcon className="right" />
            </button>
        </li>
    </ul>
}