"use client"

import * as React from "react"

interface SliderProps {
  value: number[]
  onValueChange: (value: number[]) => void
  max: number
  min: number
  step: number
  className?: string
}

export const Slider: React.FC<SliderProps> = ({
  value,
  onValueChange,
  max,
  min,
  step,
  className = ""
}) => {
  const handleChange = (index: number, newValue: number) => {
    const newValues = [...value]
    newValues[index] = newValue
    
    // Ensure min <= max
    if (index === 0 && newValues[0] > newValues[1]) {
      newValues[1] = newValues[0]
    } else if (index === 1 && newValues[1] < newValues[0]) {
      newValues[0] = newValues[1]
    }
    
    onValueChange(newValues)
  }

  const getPercent = (val: number) => ((val - min) / (max - min)) * 100

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative h-2 bg-gray-200 rounded-full">
        <div
          className="absolute h-2 bg-blue-600 rounded-full"
          style={{
            left: `${getPercent(value[0])}%`,
            width: `${getPercent(value[1]) - getPercent(value[0])}%`
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={(e) => handleChange(0, parseInt(e.target.value))}
          className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[1]}
          onChange={(e) => handleChange(1, parseInt(e.target.value))}
          className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
        />
      </div>
      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .slider-thumb::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  )
}
