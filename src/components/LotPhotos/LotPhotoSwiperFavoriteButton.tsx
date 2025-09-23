'use client'

import { useDeleteLotFromFavourites } from '@/shared/api/Lots/Favourites/deleteLotFromFavourites/useDeleteLotFromFavourites'
import { useSetLotToFavourites } from '@/shared/api/Lots/Favourites/setLotToFavorites/useSetLotToFavourites'
import { useGetUserData } from '@/shared/api/User/getUserData/useGetUserData'
import { useState } from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa'

const LotPhotoSwiperFavoriteButton = ({
	lot_id,
	auction_name,
}: {
	lot_id: number | undefined
	auction_name: 'COPART' | 'IAAI' | undefined
}) => {
	const userData = useGetUserData()

	// const isUserLogin = localStorage.getItem('access_token') ? true : false
	const isUserLogin = false
	const userFavorites = userData.data?.favorites || []

	const [isFavorite, setIsFavorite] = useState(
		userFavorites.includes(`${auction_name === 'IAAI' ? '1' : '0'}_${lot_id}`)
	)
	const addToFavorites = useSetLotToFavourites()
	const deleteFromFavorites = useDeleteLotFromFavourites()

	return (
		<>
			{isUserLogin && (
				<button
					onClick={() => {
						if (
							addToFavorites.isPending ||
							deleteFromFavorites.isPending ||
							!lot_id ||
							!auction_name
						) {
							return
						}

						isFavorite ? setIsFavorite(false) : setIsFavorite(true)

						isFavorite
							? deleteFromFavorites.mutateAsync({
									params: {
										lot_id,
										auction_name,
									},
							  })
							: addToFavorites.mutateAsync({
									params: {
										lot_id,
										auction_name,
									},
							  })
					}}
					className={`flex items-center gap-x-2 px-2 py-1 z-40 ${
						isFavorite
							? 'bg-blue-500 hover:bg-blue-500'
							: 'bg-black hover:bg-black'
					} rounded-md duration-200 bg-opacity-50 hover:bg-opacity-100`}
				>
					<span>{isFavorite ? <FaStar /> : <FaRegStar />}</span>
					<span>Favorites</span>
				</button>
			)}
		</>
	)
}

export default LotPhotoSwiperFavoriteButton
