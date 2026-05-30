import Image from 'next/image'

export function AIGirl({ size = 240 }: { size?: number }) {
  return (
    <Image
      src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/ai-girl.png`}
      width={size}
      height={size}
      alt="Pink-haired AI girl coding on her laptop"
      priority
      style={{
        display: 'block',
        width: size,
        height: size,
        imageRendering: 'pixelated',
        filter: 'drop-shadow(0 0 32px rgba(255,121,198,0.25))',
      }}
    />
  )
}
