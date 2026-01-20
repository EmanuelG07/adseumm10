<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PhotoController extends Controller
{
    // API: lijst fotos
    public function index()
{
    $photos = Photo::latest()->get()->map(function ($p) {
        return [
            'id' => $p->id,
            'title' => $p->title,
            'alt' => $p->alt,
            'url' => asset('storage/' . $p->path),
        ];
    });

    return response()->json($photos);
}

    // API: upload foto
    public function store(Request $request)
    {
        // ...
    }

    // API: delete foto
    public function destroy(Photo $photo)
    {
        // ...
    }

    // WEB ADMIN: pagina laten zien
    public function adminIndex()
    {
        $photos = Photo::latest()->get();
        return view('admin.photos', compact('photos'));
    }

    // WEB ADMIN: upload via formulier
    public function adminStore(Request $request)
    {
        $data = $request->validate([
            'photo' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'title' => ['nullable', 'string', 'max:120'],
            'alt'   => ['nullable', 'string', 'max:200'],
        ]);

        $path = $request->file('photo')->store('photos', 'public');

        Photo::create([
            'title' => $data['title'] ?? null,
            'alt'   => $data['alt'] ?? null,
            'path'  => $path,
        ]);

        return redirect('/admin/photos')->with('success', 'Foto geüpload!');
    }

    // WEB ADMIN: delete via knop
    public function adminDestroy(Photo $photo)
    {
        Storage::disk('public')->delete($photo->path);
        $photo->delete();

        return redirect('/admin/photos')->with('success', 'Foto verwijderd!');
    }
} // <-- deze moet HELEMAAL onderaan, en maar 1x
