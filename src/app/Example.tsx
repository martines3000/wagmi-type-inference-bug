"use client";

import { writeContract } from '@wagmi/core';
import { http, parseEther } from 'viem';
import { useWriteContract, createConfig } from 'wagmi';
import { base, mainnet, optimism, sepolia } from 'wagmi/chains';

const EXAMPLE_ABI = [
    {
        type: 'function',
        name: 'example1',
        inputs: [{ name: 'exampleName', type: 'address', internalType: 'address' }],
        outputs: [],
        stateMutability: 'payable',
    },
    {
        type: 'function',
        name: 'example2',
        inputs: [{ name: 'exampleName', type: 'address', internalType: 'address' }],
        outputs: [],
        stateMutability: 'nonpayable',
    },
] as const;



const EXAMPLE_ABI_2 = [
    {
        type: 'function',
        name: 'example1',
        inputs: [{ name: 'exampleName', type: 'address', internalType: 'address' }],
        outputs: [],
        stateMutability: 'payable',
    },
    {
        type: 'function',
        name: 'example2',
        inputs: [],
        outputs: [{ name: 'exampleName', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view',
    },
] as const;


const config = createConfig({
    chains: [mainnet, sepolia, base, optimism],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
        [base.id]: http(),
        [optimism.id]: http(),
    },
})

export const Example = () => {

    const { writeContract: writeContractFromHook } = useWriteContract({
        config,
    });

    const handleOnClick = async () => {
        // THIS WORKS
        writeContract(config, {
            abi: EXAMPLE_ABI,
            address: "0x0000000000000000000000000000000000000000", // Placeholder address
            functionName: 'example1',
            args: ['0x5fbdb2315678afecb367f032d93f642f64180aa3'],
            value: parseEther('1'), // Infered correctly
        });

        // THIS DOES NOT WORK
        writeContractFromHook({
            abi: EXAMPLE_ABI,
            address: "0x0000000000000000000000000000000000000000", // Placeholder address
            functionName: 'example1',
            args: ['0x5fbdb2315678afecb367f032d93f642f64180aa3'],
            value: parseEther('1'), // Infered incorrectly as undefined
        });

        // THIS WORKS
        writeContractFromHook({
            abi: [
                {
                    type: 'function',
                    name: 'example1',
                    inputs: [{ name: 'exampleName', type: 'address', internalType: 'address' }],
                    outputs: [],
                    stateMutability: 'payable',
                },
                {
                    type: 'function',
                    name: 'example2',
                    inputs: [{ name: 'exampleName', type: 'address', internalType: 'address' }],
                    outputs: [],
                    stateMutability: 'nonpayable',
                },
            ],
            address: "0x0000000000000000000000000000000000000000", // Placeholder address
            functionName: 'example1',
            args: ['0x5fbdb2315678afecb367f032d93f642f64180aa3'],
            value: parseEther('1'), // Infered correctly
        });

        // THIS WORKS
        writeContractFromHook({
            abi: EXAMPLE_ABI_2,
            address: "0x0000000000000000000000000000000000000000", // Placeholder address
            functionName: 'example1',
            args: ['0x5fbdb2315678afecb367f032d93f642f64180aa3'],
            value: parseEther('1'), // Infered incorrectly as undefined
        });
    };

    return <div>Hello World</div>
}