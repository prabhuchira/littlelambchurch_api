import { useRouter } from 'next/router'
import React from 'react';

export default function BreadCrumb() {
	const router = useRouter();
	const [breadCrumb, setBreadCrumb] = React.useState([])
	React.useEffect(() => {
		setBreadCrumb(router.asPath.split('/'));
	}, [router.route])
	return (
		<nav aria-label="breadcrumb" className="d-block " style={{ fontSize: "16px", fontFamily: "roboto" }}>
			<ol class="breadcrumb">
				{

					breadCrumb.map(i => <li class="breadcrumb-item " aria-current="page"><a className="fw-0 text-muted" href={i}>{i}</a></li>)
				}
			</ol>
		</nav>
	)
}