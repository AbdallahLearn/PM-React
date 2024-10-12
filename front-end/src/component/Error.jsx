import React from 'react';

function Error() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="mt-4 text-lg">عذرًا! الصفحة التي تبحث عنها غير موجودة.</p>
        <p className="mt-2">قد تكون قد حذفت أو تم إدخال عنوان URL بشكل غير صحيح.</p>
        <a href="/" className="mt-6 inline-block px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded">
          العودة إلى الصفحة الرئيسية
        </a>
      </div>
    </div>
  );
}

export default Error;
