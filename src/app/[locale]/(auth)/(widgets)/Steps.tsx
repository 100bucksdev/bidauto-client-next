'use client'

import React from 'react'

const Steps = ({
	steps,
	currentStep,
}: {
	steps: string[]
	currentStep: number
}) => {
	const stepWidth = 100 / (steps.length - 1)

	return (
		<div className='flex justify-center items-center w-full'>
			<div className='flex justify-between w-[90%] relative select-none'>
				{steps.map((step, index) => (
					<React.Fragment key={step}>
						{index !== 0 && (
							<div
								className={`absolute bottom-3 h-1 duration-500 bg-gray-300 -z-10`}
								style={{
									left: `${stepWidth * (index - 1)}%`,
									width: `${stepWidth}%`,
								}}
							/>
						)}
						<div
							className={`w-8 h-8 duration-150 ${
								currentStep >= index
									? 'bg-blue-600 text-t-text-primary'
									: 'bg-t-white-bg border-4 border-blue-600 text-black'
							} rounded-full flex items-center justify-center z-10`}
							style={{ left: `${stepWidth * index}%` }}
						>
							{index + 1}
						</div>
						{index !== steps.length - 1 && (
							<div
								className={`absolute bottom-3 h-1 duration-500 bg-blue-600`}
								style={{
									left: `${stepWidth * index}%`,
									width: `${currentStep > index ? stepWidth : 0}%`,
								}}
							/>
						)}
					</React.Fragment>
				))}
			</div>
		</div>
	)
}

export default Steps
