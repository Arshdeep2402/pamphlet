// import { query } from '@/lib/db';

// // import { NextResponse } from 'next/server';
// // export async function GET(request){
// //   console.log("Blog GET hit");
// //   return NextResponse.json({msg:"API working"})
// // }

// export async function GET(request) {
//   try {
//     const blogs = await query({
//       query: "SELECT * FROM blog",
//       values: [],
//     });

//     let data = JSON.stringify(blogs);
//     return new Response(data, {
//       status: 200,
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ message: "Error fetching blogs", error: error.message }), {
//       status: 500,
//     });
//   }
// }

// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const { title, description, category, author, image, authorimg } = body;

//     if (!title || !description || !category || !author) {
//       throw new Error("Missing required fields");
//     }

//     const result = await query({
//       query: "INSERT INTO blog (title, description, category, author, image, authorimg) VALUES (?, ?, ?, ?, ?, ?)",
//       values: [title, description, category, author, image, authorimg],
//     });

//     return new Response(JSON.stringify({
//       message: "success",
//       status: 200,
//       blog: { id: result.insertId, title, description, category, author, image, authorimg },
//     }), { headers: { 'Content-Type': 'application/json' } });
//   } catch (error) {
//     return new Response(JSON.stringify({ message: "Error creating blog", error: error.message }), {
//       status: 500,
//     });
//   }
// }

// export async function PUT(request) {
//   try {
//     const body = await request.json();
//     const { id, title, description, category, author, image, authorimg } = body;

//     if (!id || !title || !description || !category || !author) {
//       throw new Error("Missing required fields");
//     }

//     const result = await query({
//       query: "UPDATE blog SET title = ?, description = ?, category = ?, author = ?, image = ?, authorimg = ? WHERE id = ?",
//       values: [title, description, category, author, image, authorimg, id],
//     });

//     return new Response(JSON.stringify({
//       message: "success",
//       status: 200,
//       blog: { id, title, description, category, author, image, authorimg },
//     }), { headers: { 'Content-Type': 'application/json' } });
//   } catch (error) {
//     return new Response(JSON.stringify({ message: "Error updating blog", error: error.message }), {
//       status: 500,
//     });
//   }
// }

// export async function DELETE(request) {
//   try {
//     const body = await request.json();
//     const { id } = body;

//     if (!id) {
//       throw new Error("Missing required fields");
//     }

//     const result = await query({
//       query: "DELETE FROM blog WHERE id = ?",
//       values: [id],
//     });

//     return new Response(JSON.stringify({
//       message: "success",
//       status: 200,
//       blog: { id },
//     }), { headers: { 'Content-Type': 'application/json' } });
//   } catch (error) {
//     return new Response(JSON.stringify({ message: "Error deleting blog", error: error.message }), {
//       status: 500,
//     });
//   }
// }





import multer from 'multer';
import path from 'path';
import { query } from '@/lib/db';

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'public', 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize Multer
const upload = multer({ storage });

// Middleware to handle multipart/form-data
const uploadMiddleware = upload.fields([{ name: 'image' }, { name: 'authorimg' }]);

// Utility function to get file path
const getFilePath = (file) => {
  return file ? `/uploads/${file.filename}` : null;
};

export const config = {
  api: {
    bodyParser: false,
  },
};


export async function GET(request) {
  try {
    const blogs = await query({
      query: "SELECT * FROM blog",
      values: [],
    });
    return new Response(JSON.stringify(blogs), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error fetching blogs", error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      throw new Error("Missing required fields");
    }

    const result = await query({
      query: "DELETE FROM blog WHERE id = ?",
      values: [id],
    });

    return new Response(JSON.stringify({
      message: result.affectedRows > 0 ? "success" : "error",
      blog: { id },
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error deleting blog", error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}


export async function POST(request) {
  return new Promise((resolve, reject) => {
    upload.any()(request, null, async (err) => {
      if (err) {
        console.error("Upload Error:", err); // Debugging
        return resolve(new Response(JSON.stringify({ message: "Error uploading files", error: err.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }));
      }

      try {
        const title = request.body.title || '';
        const description = request.body.description || '';
        const category = request.body.category || '';
        const author = request.body.author || '';
        const image = request.files?.find(file => file.fieldname === 'image')?.path ?? null;
        const authorimg = request.files?.find(file => file.fieldname === 'authorimg')?.path ?? null;

        if (!title || !description || !category || !author) {
          throw new Error("Missing required fields");
        }

        const result = await query({
          query: "INSERT INTO blog (title, description, category, author, image, authorimg) VALUES (?, ?, ?, ?, ?, ?)",
          values: [title, description, category, author, image, authorimg],
        });

        resolve(new Response(JSON.stringify({
          message: "success",
          blog: { id: result.insertId, title, description, category, author, image, authorimg },
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }));
      } catch (error) {
        console.error("Creation Error:", error); // Debugging
        resolve(new Response(JSON.stringify({ message: "Error creating blog", error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }));
      }
    });
  });
}


export async function PUT(request) {
  return new Promise((resolve, reject) => {
    upload.any()(request, null, async (err) => {
      if (err) {
        console.error("Upload Error:", err); // Debugging
        return resolve(new Response(JSON.stringify({ message: "Error uploading files", error: err.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }));
      }

      try {
        const id = request.body.id || '';
        const title = request.body.title || '';
        const description = request.body.description || '';
        const category = request.body.category || '';
        const author = request.body.author || '';
        const image = request.files?.find(file => file.fieldname === 'image')?.path ?? null;
        const authorimg = request.files?.find(file => file.fieldname === 'authorimg')?.path ?? null;

        if (!id || !title || !description || !category || !author) {
          throw new Error("Missing required fields");
        }

        const result = await query({
          query: "UPDATE blog SET title = ?, description = ?, category = ?, author = ?, image = ?, authorimg = ? WHERE id = ?",
          values: [title, description, category, author, image, authorimg, id],
        });

        resolve(new Response(JSON.stringify({
          message: result.affectedRows > 0 ? "success" : "error",
          blog: { id, title, description, category, author, image, authorimg },
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }));
      } catch (error) {
        console.error("Update Error:", error); // Debugging
        resolve(new Response(JSON.stringify({ message: "Error updating blog", error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }));
      }
    });
  });
}


// ---------------------------------------------------------------working fine---------------------------------------------------------------
// export async function POST(request) {
//   return new Promise((resolve, reject) => {
//     uploadMiddleware(request, null, async (err) => {
//       if (err) {
//         return resolve(new Response(JSON.stringify({ message: "Error uploading files", error: err.message }), {
//           status: 500,
//           headers: { 'Content-Type': 'application/json' }
//         }));
//       }

//       try {
//         // Dummy data for testing
//         const title = "Dummy Title";
//         const description = "This is a dummy description for testing.";
//         const category = "Technology";
//         const author = "John Doe";
//         const image = request.files?.image ? getFilePath(request.files.image[0]) : null;
//         const authorimg = request.files?.authorimg ? getFilePath(request.files.authorimg[0]) : null;

//         if (!title || !description || !category || !author) {
//           throw new Error("Missing required fields");
//         }

//         const result = await query({
//           query: "INSERT INTO blog (title, description, category, author, image, authorimg) VALUES (?, ?, ?, ?, ?, ?)",
//           values: [title, description, category, author, image, authorimg],
//         });

//         resolve(new Response(JSON.stringify({
//           message: "success",
//           blog: { id: result.insertId, title, description, category, author, image, authorimg },
//         }), {
//           status: 200,
//           headers: { 'Content-Type': 'application/json' }
//         }));
//       } catch (error) {
//         resolve(new Response(JSON.stringify({ message: "Error creating blog", error: error.message }), {
//           status: 500,
//           headers: { 'Content-Type': 'application/json' }
//         }));
//       }
//     });
//   });
// }

// export async function PUT(request) {
//   return new Promise((resolve, reject) => {
//     uploadMiddleware(request, null, async (err) => {
//       if (err) {
//         return resolve(new Response(JSON.stringify({ message: "Error uploading files", error: err.message }), {
//           status: 500,
//           headers: { 'Content-Type': 'application/json' }
//         }));
//       }

//       try {
//         // Dummy data for testing
//         const id = 1; // Assume updating blog with ID 1
//         const title = "Updated Dummy Title";
//         const description = "This is an updated dummy description for testing.";
//         const category = "Updated Technology";
//         const author = "Updated John Doe";
//         const image = request.files?.image ? getFilePath(request.files.image[0]) : null;
//         const authorimg = request.files?.authorimg ? getFilePath(request.files.authorimg[0]) : null;

//         if (!id || !title || !description || !category || !author) {
//           throw new Error("Missing required fields");
//         }

//         const result = await query({
//           query: "UPDATE blog SET title = ?, description = ?, category = ?, author = ?, image = ?, authorimg = ? WHERE id = ?",
//           values: [title, description, category, author, image, authorimg, id],
//         });

//         resolve(new Response(JSON.stringify({
//           message: result.affectedRows > 0 ? "success" : "error",
//           blog: { id, title, description, category, author, image, authorimg },
//         }), {
//           status: 200,
//           headers: { 'Content-Type': 'application/json' }
//         }));
//       } catch (error) {
//         resolve(new Response(JSON.stringify({ message: "Error updating blog", error: error.message }), {
//           status: 500,
//           headers: { 'Content-Type': 'application/json' }
//         }));
//       }
//     });
//   });
// }
// ---------------------------------------------------------------working fine---------------------------------------------------------------

