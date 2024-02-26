interface Props {}

const MessageWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="px-6 py-4 bg-[#0e1122] rounded-2xl relative">
      <span
        className="absolute left-[-12px] bottom-0 w-6 h-5 bg-[#0e1122] mix-blend-lighten"
        style={{
          clipPath: "path(\"M 0 20 C 12 19 20 11 18 1 L 24 20 Z\")"
        }}
      />
      {children}
    </div>
  )
}

export default MessageWrapper
