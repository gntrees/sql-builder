type SampleCodeBlockProps = {
  html: string
  darkHtml: string
}

export function SampleCodeBlock({ html, darkHtml }: SampleCodeBlockProps) {
  return (
    <div className="rounded-md bg-[#282c34] p-4">
      {/* <div
        className="overflow-auto dark:hidden [&>pre]:m-0"
        dangerouslySetInnerHTML={{ __html: html }}
      /> */}
      <div
        className=" overflow-auto [&>pre]:m-0"
        dangerouslySetInnerHTML={{ __html: darkHtml }}
      />
    </div>
  )
}
