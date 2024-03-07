import { useEffect, useRef } from 'react';

// 定义缓存对象的类型
interface Cache<T> {
	data: T | undefined;
	dependencies: Record<string, any>;
}

// 定义 useCache Hook 的返回类型
const useCache = <T>(computeFunction: () => T, dependencies: any[]): T | undefined => {
	const cache = useRef<Cache<T>>({ data: undefined, dependencies: {} });

	useEffect(() => {
		// 检查是否需要重新计算
		const shouldCompute =
			!cache.current.data || dependencies.some((dep) => cache.current.dependencies[dep] !== dependencies[dep]);

		if (shouldCompute) {
			// 执行计算
			const newData = computeFunction();

			// 更新缓存
			cache.current.data = newData;
			cache.current.dependencies = dependencies.reduce((acc, dep) => {
				acc[dep] = dependencies[dep];
				return acc;
			}, {} as Record<string, any>);
		}
	}, [computeFunction, dependencies]);

	return cache.current.data;
};

export default useCache;
