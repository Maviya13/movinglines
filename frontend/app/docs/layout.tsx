import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ReactNode } from 'react';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <RootProvider
            search={{ enabled: false }}
            theme={{
                defaultTheme: 'dark',
            }}
        >
            <DocsLayout tree={source.pageTree} {...baseOptions()}>
                {children}
            </DocsLayout>
        </RootProvider>
    );
}
