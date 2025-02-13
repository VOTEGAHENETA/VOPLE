interface Props {
  size: number;
}

function IconUsers({ size }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 151 150'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect x='0.5' width='150' height='150' fill='url(#pattern0_3444_3583)' />
      <defs>
        <pattern
          id='pattern0_3444_3583'
          patternContentUnits='objectBoundingBox'
          width='1'
          height='1'
        >
          <use xlinkHref='#image0_3444_3583' transform='scale(0.01)' />
        </pattern>
        <image
          id='image0_3444_3583'
          width='100'
          height='100'
          xlinkHref='data:image/png;base64,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'
        />
      </defs>
    </svg>
  );
}

export default IconUsers;
