import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import useStore, { NF } from '../../useStore'
import Table, { TableHeader } from '../../components/Table'

interface ERC20TokenListItem {
	token:				string
	name:				string
	des:				string
	transfers24H:		number
	trnasfers7D:		number
}

interface Erc721TopTokenStatus {
	data:			Array<ERC20TokenListItem>
	count:			number,
	limit:			number,
	page:			number
	total:			number
}

const Erc721TopTokens = () => {
	const {sendJson, timeAgo} = useStore()
	const location = useLocation();
	const blockNumber = location && location?.search?.includes("block") ? Number(new URLSearchParams(location.search).get("block")) : 0
	const [status, setStatus] = React.useState<Erc721TopTokenStatus>({
		data:		[],
		count:		0,
		limit:		10,
		page:		0,
		total:		0,
	})

	
	const onData = (page: number, limit: number) => {
		const mockdata:ERC20TokenListItem[] = [
			{
				token:				"0x123123123",
				name:				"Goated Asshole",
				des:				"Description",
				transfers24H:		9084,
				trnasfers7D:		9084,
			},
			{
				token:				"0x111111111111111",
				name:				"WeaponizedCountries",
				des:				"Taking inspiration from creator's personal doodles as kids - Weaponized Countries is a GameFi NFT collection on Fantom of randomized countries featuring 500+ unique weapons and traits!",
				transfers24H:		625,
				trnasfers7D:		1005,
			}
		];
		if(limit!==status.limit) setStatus({...status, limit})
		setStatus({
			data:		mockdata,
			count:		mockdata.length,
			limit:		10,
			page:		0,
			total:		mockdata.length,
		});
	}

	// const onData = (page: number, limit: number) => {
	// 	if (limit!==status.limit) setStatus({...status, limit})
	// 	sendJson("get-txlist", blockNumber, page, limit).then(res=>{
	// 		if (res.result) {
	// 			const {data, count, total, page, limit} = res.result as {data: Erc721TokenListItemStatus[], count: number, total: number, page: number, limit: number}
	// 			setStatus({
	// 				data,
	// 				count,
	// 				limit,
	// 				page,
	// 				total,
	// 			})
	// 		}
	// 	})
	// }

	const fields = [
		{key: "name",			label: "Token",				render: (v:string, i)=>(
			<div>
				<Link to={`/token/${i.token}`}>{v}</Link>
				<p className='text-wrap'>{i.des}</p>
			</div>
		)},
		{key: "transfers24H",	label: "Transfers(24H)",	render: (v:number)=><code>{NF(v)}</code>},
		{key: "trnasfers7D",	label: "Transfers(7D)",		render: (v:number)=><code>{NF(v)}</code>}
	] as TableHeader[]

	return (
		<div className='txs'>
			<section className='container'>
				<h3>Non-Fungible Tokens Tracker<small className='badge badge-info badge-pill m-l-1'>ERC-721</small></h3>
				<div className='panel'>
					<Table 
						header={(
							<div>A total {NF(status.count)} Token Contracts found</div>
						)}
						page={status.page}
						total={status.total}
						fields={fields} 
						data={status.data}
						onData={onData}
					/>
				</div>
			</section>
		</div>
	)
};

export default Erc721TopTokens;