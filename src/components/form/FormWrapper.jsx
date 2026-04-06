export default function FormWrapper({ title, children }) {
  return (
    <>
      
      <h2 className="text-xl font-semibold mb-4 text-center">
        {title}
      </h2>

      {children}
      
    </>
  );
}