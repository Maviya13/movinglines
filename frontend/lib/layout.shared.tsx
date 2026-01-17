import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

export function baseOptions(): BaseLayoutProps {
    return {
        nav: {
            title: (
                <>
                    <Image
                        src="/logo.png"
                        alt="MovingLines"
                        width={24}
                        height={24}
                        className="rounded-sm"
                    />
                    <span className="font-semibold">MovingLines</span>
                </>
            ),
        },
        links: [
            {
                text: 'Home',
                url: '/',
            },
            {
                text: 'Dashboard',
                url: '/dashboard',
            },
        ],
    };
}
