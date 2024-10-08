import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
	locales: ['ua', 'en'],
	defaultLocale: 'en',
});

export const { Link, redirect, usePathname, useRouter } =
	createSharedPathnamesNavigation(routing);