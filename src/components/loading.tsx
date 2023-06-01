interface Props {
    showLoading: boolean
}

export function Loading(props: Props) {
    return <div>{props.showLoading && "Loading"}</div>
}