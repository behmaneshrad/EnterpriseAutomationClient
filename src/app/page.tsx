export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br bg-amber-50 from-purple-200 to-pink-100">
      <h1 className="text-4xl font-bold text-purple-400 mb-4"> خوش امدید </h1>
      <p className="text-gray-600 text-lg">لطفاً از منو برای ثبت درخواست یا مشاهده داشبورد استفاده کنیذ.</p>
      <div className="mt-6 space-x-4">
        <a href="/dashboard" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 mx-2">داشبورد</a>
        <a href="/request/new" className="bg-purple-300 text-gray-700 px-4 py-2 rounded hover:bg-purple-400 mx-2">ثبت درخواست جدید</a>
      </div>
    </main>
  )
}
     
