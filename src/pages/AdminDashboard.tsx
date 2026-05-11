import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ChevronDown, ChevronUp, ArrowLeft, User } from 'lucide-react';
import { admin, AdminWorker, AdminPayout, Job } from '../lib/api';
import { formatCurrency } from '../lib/utils';
import { toast } from '../hooks/useToast';

function fmtServiceType(s: string) {
  return s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function fmt(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

function WorkerDetail({ uuid }: { uuid: string }) {
  const { data: jobs, isLoading: jobsLoading } = useQuery({
    queryKey: ['admin', 'worker-jobs', uuid],
    queryFn: () => admin.getWorkerJobs(uuid).then((r) => r.data),
  });
  const { data: payouts, isLoading: payoutsLoading } = useQuery({
    queryKey: ['admin', 'worker-payouts', uuid],
    queryFn: () => admin.getWorkerPayouts(uuid).then((r) => r.data),
  });

  if (jobsLoading || payoutsLoading) {
    return <div className="px-4 py-3 text-sm text-uber-gray-400">Loading...</div>;
  }

  return (
    <div className="border-t border-uber-gray-100 bg-uber-gray-50 px-4 py-4 space-y-4">
      <div>
        <p className="text-xs font-semibold text-uber-gray-400 uppercase tracking-wider mb-2">Jobs ({jobs?.length ?? 0})</p>
        {!jobs?.length ? (
          <p className="text-sm text-uber-gray-400">No jobs yet</p>
        ) : (
          <div className="space-y-1.5">
            {jobs.map((job: Job) => (
              <div key={job.uuid} className="flex items-center justify-between text-sm bg-white rounded-lg px-3 py-2 border border-uber-gray-100">
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${job.status === 'confirmed' ? 'bg-green-500' : job.status === 'cancelled' ? 'bg-red-400' : 'bg-yellow-400'}`} />
                  <span className="font-medium text-black">{fmtServiceType(job.serviceType === 'bundle' && job.serviceTypes?.length ? job.serviceTypes.map(fmtServiceType).join(' + ') : job.serviceType)}</span>
                  <span className="text-uber-gray-400">{fmt(job.createdAt)}</span>
                </div>
                <div className="flex items-center gap-3 text-right">
                  <span className="text-uber-gray-500 capitalize">{job.status}</span>
                  <span className="font-semibold text-black">{formatCurrency(job.price)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <p className="text-xs font-semibold text-uber-gray-400 uppercase tracking-wider mb-2">Payouts ({payouts?.length ?? 0})</p>
        {!payouts?.length ? (
          <p className="text-sm text-uber-gray-400">No payouts yet</p>
        ) : (
          <div className="space-y-1.5">
            {payouts.map((p: AdminPayout, i: number) => (
              <div key={i} className="flex items-center justify-between text-sm bg-white rounded-lg px-3 py-2 border border-uber-gray-100">
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${p.status === 'paid' ? 'bg-green-500' : 'bg-yellow-400'}`} />
                  <span className="text-uber-gray-500 capitalize">{p.type} · {p.status}</span>
                  <span className="text-uber-gray-400">{fmt(p.createdAt)}</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-black">{formatCurrency(p.baseAmount)}</span>
                  {p.tipAmount > 0 && (
                    <span className="text-uber-gray-400 ml-1">+{formatCurrency(p.tipAmount)} tip</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function WorkerCard({ worker }: { worker: AdminWorker }) {
  const [expanded, setExpanded] = useState(false);
  const queryClient = useQueryClient();

  const patchMutation = useMutation({
    mutationFn: (updates: { isAvailable?: boolean; isApproved?: boolean }) =>
      admin.patchWorker(worker.uuid, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'workers'] });
    },
    onError: () => toast({ title: 'Update failed', variant: 'destructive' }),
  });

  const avatarUrl = worker.profileImageUrl || worker.img;

  return (
    <div className="bg-white rounded-2xl border border-uber-gray-100 shadow-sm overflow-hidden">
      <div className="px-4 py-4">
        <div className="flex items-start gap-3">
          {avatarUrl ? (
            <img src={avatarUrl} alt={worker.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
          ) : (
            <div className="w-12 h-12 rounded-full bg-uber-gray-100 flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-uber-gray-400" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-black text-black text-base">{worker.name}</h3>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${worker.isAvailable ? 'bg-green-100 text-green-700' : 'bg-uber-gray-100 text-uber-gray-500'}`}>
                {worker.isAvailable ? 'Available' : 'Unavailable'}
              </span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${worker.isApproved ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-600'}`}>
                {worker.isApproved ? 'Approved' : 'Pending'}
              </span>
            </div>
            {worker.bio && <p className="text-sm text-uber-gray-500 mt-0.5 line-clamp-2">{worker.bio}</p>}
            <div className="flex items-center gap-4 mt-2 text-xs text-uber-gray-500">
              <span>{worker.jobCount} jobs</span>
              <span>{formatCurrency(worker.totalEarnings)} earned</span>
              <span>★ {worker.rating.toFixed(1)} ({worker.ratingCount})</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <button
            onClick={() => patchMutation.mutate({ isAvailable: !worker.isAvailable })}
            disabled={patchMutation.isPending}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-uber-gray-200 hover:bg-uber-gray-50 transition-colors disabled:opacity-50"
          >
            {worker.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
          </button>

          {worker.isApproved ? (
            <button
              onClick={() => patchMutation.mutate({ isApproved: false })}
              disabled={patchMutation.isPending}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              Revoke Approval
            </button>
          ) : (
            <button
              onClick={() => patchMutation.mutate({ isApproved: true })}
              disabled={patchMutation.isPending}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-black text-white hover:bg-uber-gray-800 transition-colors disabled:opacity-50"
            >
              Approve
            </button>
          )}

          <button
            onClick={() => setExpanded((v) => !v)}
            className="ml-auto text-xs font-semibold px-3 py-1.5 rounded-lg border border-uber-gray-200 hover:bg-uber-gray-50 transition-colors flex items-center gap-1"
          >
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            {expanded ? 'Hide' : 'Details'}
          </button>
        </div>
      </div>

      {expanded && <WorkerDetail uuid={worker.uuid} />}
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();

  const { data: workers, isLoading, isError } = useQuery({
    queryKey: ['admin', 'workers'],
    queryFn: () => admin.getWorkers().then((r) => r.data),
  });

  return (
    <div className="min-h-screen bg-uber-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs text-uber-gray-400 uppercase tracking-widest font-semibold">Admin</p>
            <h1 className="text-3xl font-black text-black mt-0.5">Workers</h1>
          </div>
          <button
            onClick={() => navigate('/worker/dashboard')}
            className="flex items-center gap-1.5 text-sm font-semibold text-uber-gray-500 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Exit Admin
          </button>
        </div>

        {isLoading && (
          <div className="text-center py-16 text-uber-gray-400">Loading workers...</div>
        )}

        {isError && (
          <div className="text-center py-16 text-red-500">Failed to load workers.</div>
        )}

        {workers && (
          <>
            <p className="text-sm text-uber-gray-500 mb-4">{workers.length} worker{workers.length !== 1 ? 's' : ''}</p>
            <div className="space-y-3">
              {workers.map((w: AdminWorker) => (
                <WorkerCard key={w.uuid} worker={w} />
              ))}
              {workers.length === 0 && (
                <div className="text-center py-16 text-uber-gray-400">No workers yet.</div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
