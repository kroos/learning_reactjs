<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProfileController extends Controller
{
	/**
	* Display the user's profile form.
	*/
	public function edit(Request $request)
	{
		return Inertia::render('Profile/Edit', [
			'user' => $request->user()->user,
		]);
	}

	/**
	* Update the user's profile information.
	*/
	public function update(ProfileUpdateRequest $request): RedirectResponse
	{
		$request->user()->user->fill($request->validated());

		if ($request->user()->user->isDirty('email')) {
			$request->user()->user->email_verified_at = null;
		}

		$request->user()->user->save();

		return Redirect::route('profile.edit')->with('status', 'profile-updated');
	}

	/**
	* Delete the user's account.
	*/
	public function destroy(Request $request): RedirectResponse
	{
		$request->validateWithBag('userDeletion', [
			'password' => ['required', 'current_password'],
		]);

		$user = $request->user();

		Auth::logout();

		$user->delete();
		$user->user->delete();

		$request->session()->invalidate();
		$request->session()->regenerateToken();

		return Redirect::to('/');
	}
}
